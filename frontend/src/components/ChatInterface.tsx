
import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../context/ChatContext';
import MessageBubble from './MessageBubble';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Loader2, RefreshCw } from 'lucide-react';
import { cn } from '../lib/utils';
import MeMessageIcon from '@/assets/images/hicham_avatar_small.png';

const ChatInterface = () => {
    const { messages, isLoading, sendMessage, clearMessages } = useChat();
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatAreaEndRef = useRef<HTMLDivElement>(null);
    const [showTypingIndicator, setShowTypingIndicator] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (inputValue.trim() && !isLoading) {
            const message = inputValue;
            setInputValue('');


            await sendMessage(message);

            // Focus the input again after sending after a delay
            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.focus();

                    // Scroll to the bottom after sending the message
                    scrollToBottom();
                }
            }, 50);



        }
    };

    const scrollToBottom = () => {
        if (chatAreaEndRef.current) {
            chatAreaEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, [messages]);

    // Scroll to bottom when messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages, showTypingIndicator]);

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
        scrollToBottom();
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
        <div className="flex flex-col w-full max-w-4xl mx-auto h-[calc(100dvh-14rem)] sm:h-[calc(100dvh-16rem)] md:h-[calc(100dvh-18rem)] glass rounded-xl overflow-hidden border border-border/50 opacity-85">
            {/* Chat header */}
            <div className="p-4 border-b border-border/40 flex justify-between items-center glass-darker">
                <h3 className="text-lg font-medium">Chat with my virtual self</h3>
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
            <div className="flex-1 overflow-y-auto p-4 sm:p-6" style={{ marginBottom: '4rem' }}>
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-6">
                        <div className="w-32 h-32 mb-4 rounded-full bg-muted flex items-center justify-center animate-float">
                            <img
                                src={MeMessageIcon}
                                alt="Bot Avatar"
                                className="rounded-full w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="text-xl font-medium mb-2">Welcome to Hicham's Portfolio</h3>
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
                                <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden mr-3 flex items-center justify-center bg-secondary">
                                    <img
                                        src={MeMessageIcon}
                                        alt="Bot Avatar"
                                        className="rounded-full w-full h-full object-cover"
                                    />
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
                    </div>
                )}
                <div ref={messagesEndRef} />
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
                    Press Enter to send
                </div>
            </form>
            <div className="text-xs text-muted-foreground my-4 text-center">
                You can send up to 5 messages per minute.
                Your messages and IP address may be logged and reviewed by Hicham if needed.
            </div>
            <div ref={chatAreaEndRef} />
        </div>
    );
};


export default ChatInterface;