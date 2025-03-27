
import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../context/ChatContext';
import MessageBubble from './MessageBubble';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Loader2, RefreshCw } from 'lucide-react';
import { cn } from '../lib/utils';

const ChatInterface = () => {
    const { messages, isLoading, sendMessage, clearMessages } = useChat();
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [showTypingIndicator, setShowTypingIndicator] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (inputValue.trim() && !isLoading) {
            const message = inputValue;
            setInputValue('');

            // Focus the input again after sending
            if (inputRef.current) {
                inputRef.current.focus();
            }

            await sendMessage(message);
        }
    };

    // Typing indicator effect
    useEffect(() => {
        if (isLoading) {
            setShowTypingIndicator(true);
        } else {
            // Delay hiding the indicator for a more natural feel
            const timeout = setTimeout(() => setShowTypingIndicator(false), 500);
            return () => clearTimeout(timeout);
        }
    }, [isLoading]);

    // Scroll to bottom when messages change
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, showTypingIndicator]);

    // Handle keyboard shortcut (Cmd/Ctrl + Enter)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                handleSubmit(e as unknown as React.FormEvent);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [inputValue, isLoading]);

    // Auto focus the input on component mount
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col w-full max-w-4xl mx-auto h-[calc(100vh-12rem)] sm:h-[calc(100vh-14rem)] md:h-[calc(100vh-16rem)] glass rounded-xl overflow-hidden border border-border/40">
            {/* Chat header */}
            <div className="p-4 border-b border-border/40 flex justify-between items-center glass-darker">
                <h3 className="text-lg font-medium">Chat Assistant</h3>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearMessages}
                    className="text-muted-foreground hover:text-foreground"
                >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">New Chat</span>
                </Button>
            </div>

            {/* Messages container */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-6">
                        <div className="w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center animate-float">
                            <Bot className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-medium mb-2">Welcome to My Portfolio</h3>
                        <p className="text-muted-foreground max-w-md">
                            Ask me anything about my work, experience, or skills. I'm here to help!
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {messages.map((message) => (
                            <MessageBubble key={message.id} message={message} />
                        ))}

                        {/* Typing indicator */}
                        {showTypingIndicator && (
                            <div className="flex items-start mb-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden mr-3 flex items-center justify-center bg-secondary">
                                    <Bot className="w-5 h-5 text-secondary-foreground" />
                                </div>
                                <div className="glass rounded-xl rounded-tl-none py-3 px-4">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-muted-foreground/70 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-2 h-2 bg-muted-foreground/70 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-2 h-2 bg-muted-foreground/70 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            {/* Input form */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-border/40 glass-darker">
                <div className="flex space-x-2">
                    <Input
                        ref={inputRef}
                        type="text"
                        placeholder="Type your message..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        disabled={isLoading}
                        className="flex-1"
                    />
                    <Button
                        type="submit"
                        disabled={isLoading || !inputValue.trim()}
                        className={cn("transition-all flex items-center justify-center",
                            isLoading ? "w-[40px]" : (inputValue.trim() ? "w-[90px]" : "w-[40px]")
                        )}
                    >
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <>
                                <Send className="h-4 w-4" />
                                {inputValue.trim() && <span className="ml-2 hidden sm:inline">Send</span>}
                            </>
                        )}
                    </Button>
                </div>
                <div className="text-xs text-muted-foreground mt-2 text-center sm:text-right">
                    Press Cmd+Enter (or Ctrl+Enter) to send
                </div>
            </form>
        </div>
    );
};

// Import the Bot icon since we're using it in the empty state
import { Bot } from 'lucide-react';

export default ChatInterface;