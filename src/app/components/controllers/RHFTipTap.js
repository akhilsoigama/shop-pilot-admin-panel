'use client';
import StarterKit from '@tiptap/starter-kit';
import { EditorProvider } from '@tiptap/react';
import { RHFTipTapMenuBar } from '../common/RHFTipTapMenuBar';

const RFFTiptapEditor = ({ onChange, value, height = '300px' }) => {
  return (
    <div className="w-full">
      <EditorProvider
        extensions={[StarterKit]}
        content={value || ''}
        onUpdate={({ editor }) => {
          if (typeof onChange === 'function') {
            onChange(editor.getHTML()); 
          }
        }}
        editorProps={{
          attributes: {
            style: { minHeight: height },
            class: `border rounded-md h-[200px] scrollbar-hide overflow-auto sid bg-white dark:bg-zinc-800 px-8 py-5 focus:outline-none`,
          },
        }}
        slotBefore={<RHFTipTapMenuBar />}
        immediatelyRender={false}
      />
    </div>
  );
};

export default RFFTiptapEditor;