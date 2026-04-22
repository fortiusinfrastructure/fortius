'use client';

import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Heading2,
    Heading3,
    Quote,
    Link as LinkIcon,
    Image as ImageIcon,
    Undo,
    Redo,
} from 'lucide-react';

interface ToolbarButtonProps {
    onClick: () => void;
    active?: boolean;
    title: string;
    children: React.ReactNode;
}

function ToolbarButton({ onClick, active, title, children }: ToolbarButtonProps) {
    return (
        <button
            type="button"
            onMouseDown={(e) => {
                e.preventDefault();
                onClick();
            }}
            title={title}
            className={`p-1.5 rounded transition-colors ${
                active
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
        >
            {children}
        </button>
    );
}

interface RichTextEditorProps {
    value: string;
    onChange: (html: string) => void;
    placeholder?: string;
    className?: string;
}

export function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({ inline: false }),
            Link.configure({ openOnClick: false }),
            Placeholder.configure({ placeholder: placeholder ?? 'Escribe aquí el contenido…' }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm max-w-none focus:outline-none min-h-[300px] px-4 py-3',
            },
        },
    });

    // Sync external value changes (e.g., tab switches)
    useEffect(() => {
        if (editor && editor.getHTML() !== value) {
            editor.commands.setContent(value, false);
        }
    }, [value, editor]);

    const addLink = () => {
        const url = window.prompt('URL del enlace:');
        if (url && editor) {
            editor.chain().focus().setLink({ href: url }).run();
        }
    };

    const addImage = () => {
        const url = window.prompt('URL de la imagen:');
        if (url && editor) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    if (!editor) return null;

    return (
        <div className={`border border-slate-200 rounded-lg overflow-hidden ${className ?? ''}`}>
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-slate-200 bg-slate-50">
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    active={editor.isActive('bold')}
                    title="Negrita"
                >
                    <Bold size={15} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    active={editor.isActive('italic')}
                    title="Cursiva"
                >
                    <Italic size={15} />
                </ToolbarButton>

                <span className="w-px h-5 bg-slate-200 mx-1" />

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    active={editor.isActive('heading', { level: 2 })}
                    title="Título H2"
                >
                    <Heading2 size={15} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    active={editor.isActive('heading', { level: 3 })}
                    title="Título H3"
                >
                    <Heading3 size={15} />
                </ToolbarButton>

                <span className="w-px h-5 bg-slate-200 mx-1" />

                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    active={editor.isActive('bulletList')}
                    title="Lista"
                >
                    <List size={15} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    active={editor.isActive('orderedList')}
                    title="Lista numerada"
                >
                    <ListOrdered size={15} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    active={editor.isActive('blockquote')}
                    title="Cita"
                >
                    <Quote size={15} />
                </ToolbarButton>

                <span className="w-px h-5 bg-slate-200 mx-1" />

                <ToolbarButton onClick={addLink} active={editor.isActive('link')} title="Enlace">
                    <LinkIcon size={15} />
                </ToolbarButton>
                <ToolbarButton onClick={addImage} title="Imagen por URL">
                    <ImageIcon size={15} />
                </ToolbarButton>

                <span className="w-px h-5 bg-slate-200 mx-1" />

                <ToolbarButton
                    onClick={() => editor.chain().focus().undo().run()}
                    title="Deshacer"
                >
                    <Undo size={15} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().redo().run()}
                    title="Rehacer"
                >
                    <Redo size={15} />
                </ToolbarButton>
            </div>

            {/* Editor area */}
            <EditorContent editor={editor} className="bg-white" />
        </div>
    );
}
