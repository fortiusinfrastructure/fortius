import React from 'react';

/**
 * RichText — renders inline text with *italic* support.
 * Wrap book/work titles with *asterisks* in translation strings to display them in italics.
 * Example: "In *De Rege* he argues..." → "In <em>De Rege</em> he argues..."
 */
interface RichTextProps {
    text: string;
    className?: string;
}

export const RichText: React.FC<RichTextProps> = ({ text, className }) => {
    // Split on *...* patterns
    const parts = text.split(/\*([^*]+)\*/g);

    if (parts.length === 1) {
        // No italic markers — render as plain text node (no wrapper span)
        return <>{text}</>;
    }

    return (
        <span className={className}>
            {parts.map((part, i) =>
                // Odd indices are the captured groups (between the asterisks)
                i % 2 === 1 ? (
                    <em key={i}>{part}</em>
                ) : (
                    part || null
                )
            )}
        </span>
    );
};
