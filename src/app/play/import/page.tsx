'use client';

import type { DragEvent } from 'react';
import { useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';

type UploadState = 'idle' | 'reading' | 'ready' | 'error';

const ImportPage = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>('');
  const [status, setStatus] = useState<UploadState>('idle');
  const [error, setError] = useState<string>('');
  const { upload, setUploadSource } = useStore((state) => ({
    upload: state.upload,
    setUploadSource: state.actions.setUploadSource,
  }));

  const persistFile = useCallback(
    (file?: File) => {
      if (!file) return;
      if (file.type !== 'application/pdf') {
        setStatus('error');
        setError('Please upload a PDF file. DOC/DOCX will be supported later.');
        return;
      }
      setStatus('reading');
      setError('');
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = typeof reader.result === 'string' ? reader.result : '';
        setUploadSource({
          name: file.name,
          size: file.size,
          dataUrl,
          lastModified: file.lastModified,
        });
        setStatus('ready');
      };
      reader.onerror = () => {
        setStatus('error');
        setError('Unable to read file. Please try another PDF.');
      };
      reader.readAsDataURL(file);
    },
    [setUploadSource]
  );

  const handleDrop = useCallback(
    (event: DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      const [file] = Array.from(event.dataTransfer.files);
      persistFile(file);
    },
    [persistFile]
  );

  const goToDifficulty = () => {
    if (!upload) {
      setStatus('error');
      setError('Upload a PDF first so we can generate questions later.');
      return;
    }
    router.push('/play/difficulty?quiz=upload');
  };

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
          <span className="text-sm text-slate-500">PDF only (DOCX support coming soon)</span>
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
            accept=".pdf"
            className="hidden"
            onChange={(event) => persistFile(event.target.files?.[0])}
          />
        </label>
        <div className="space-y-2 text-sm text-slate-500">
          {status === 'reading' && <p>Reading file…</p>}
          {status === 'ready' && upload && (
            <p>
              Ready! We stored <span className="font-semibold text-slate-800">{upload.name}</span> ({(upload.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
          {error && <p className="text-rose-600">{error}</p>}
          <p>We keep the PDF client-side for now and will process it on the next screen.</p>
        </div>
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
