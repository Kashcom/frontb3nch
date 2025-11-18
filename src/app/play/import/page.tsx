'use client';

import type { DragEvent } from 'react';
import { useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const ImportPage = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>('');

  const handleFile = useCallback((file?: File) => {
    if (file) {
      setFileName(file.name);
    }
  }, []);

  const handleDrop = useCallback(
    (event: DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      const [file] = Array.from(event.dataTransfer.files);
      handleFile(file);
    },
    [handleFile]
  );

  const goToDifficulty = () => router.push('/play/difficulty?quiz=upload');

  return (
    <motion.section
      className="bg-slate-50 px-4 py-14 sm:px-6 sm:py-16"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="sr-only">Import your study PDFs</h1>
      <div className="mx-auto max-w-4xl space-y-8 rounded-3xl border border-dashed border-slate-200 bg-white p-6 text-center shadow-xl sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Upload</p>
        <p className="text-2xl font-bold text-slate-900 sm:text-3xl">Drag & drop your PDF or notes</p>
        <label
          htmlFor="uploader"
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
          className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 px-6 py-12 text-slate-600 transition hover:border-primary hover:bg-white sm:px-8 sm:py-16"
        >
          <span className="text-lg font-semibold text-slate-800">{fileName || 'Drop your file here'}</span>
          <span className="text-sm text-slate-500">PDF, DOCX, or plain text</span>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white shadow-lg"
          >
            Browse files
          </button>
          <input
            id="uploader"
            ref={inputRef}
            type="file"
            accept=".pdf,.txt,.doc,.docx"
            className="hidden"
            onChange={(event) => handleFile(event.target.files?.[0])}
          />
        </label>
        <div className="space-y-4">
          <button
            type="button"
            onClick={goToDifficulty}
            className="w-full rounded-2xl bg-primary px-6 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-emerald-700"
          >
            Continue to difficulty
          </button>
          <button
            type="button"
            onClick={() => router.push('/play/library')}
            className="text-sm font-semibold text-slate-600 underline underline-offset-4"
          >
            or pick from library
          </button>
        </div>
      </div>
    </motion.section>
  );
};

export default ImportPage;
