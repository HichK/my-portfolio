
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Message } from '@/context/ChatContext';
import { User, Bot } from 'lucide-react';

interface MessageBubbleProps {
    message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
    const isUser = message.role === 'user';
    const messageRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Format the timestamp
    const formattedTime = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    }).format(message.timestamp);

    useEffect(() => {
        setIsVisible(true);

        if (messageRef.current) {
            messageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    return (
        <div
            ref={messageRef}
            className={cn(
                'flex items-start mb-4 transition-all duration-300 ease-out',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
                isUser ? 'justify-end' : 'justify-start'
            )}
        >
            {!isUser && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden mr-3 flex items-center justify-center bg-secondary">
                    <Bot className="w-5 h-5 text-secondary-foreground" />
                </div>
            )}

            <div
                className={cn(
                    'max-w-[75%] md:max-w-[80%] rounded-xl p-4 shadow-sm',
                    isUser
                        ? 'bg-primary text-primary-foreground rounded-tr-none'
                        : 'glass rounded-tl-none'
                )}
            >
                <div className="text-sm md:text-base whitespace-pre-wrap">{message.content}</div>
                <div className={cn(
                    'text-xs mt-1 text-right',
                    isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
                )}>
                    {formattedTime}
                </div>
            </div>

            {isUser && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden ml-3 flex items-center justify-center bg-primary">
                    <User className="w-5 h-5 text-primary-foreground" />
                </div>
            )}
        </div>
    );
};

export default MessageBubble;