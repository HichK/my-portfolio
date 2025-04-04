import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Message = {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
};

type ChatContextType = {
    messages: Message[];
    isLoading: boolean;
    sendMessage: (content: string) => Promise<void>;
    clearMessages: () => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};

type ChatProviderProps = {
    children: ReactNode;
};

export const ChatProvider = ({ children }: ChatProviderProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Load messages from localStorage on initial render
    useEffect(() => {
        const savedMessages = localStorage.getItem('chatMessages');
        if (savedMessages) {
            try {
                const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
                    ...msg,
                    timestamp: new Date(msg.timestamp)
                }));
                setMessages(parsedMessages);
            } catch (error) {
                console.error('Failed to parse saved messages:', error);
                localStorage.removeItem('chatMessages');
            }
        }
    }, []);

    // Save messages to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }, [messages]);

    const sendMessage = async (content: string) => {
        if (!content.trim()) return;

        // Get today's time in a readable format
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        // Get today's date in a readable format
        const currentDate = new Date().toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' });

        // Add user message to the state
        const userMessage: Message = {
            id: Date.now().toString(),
            content,
            role: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            // Prepare the conversation history for the API
            const conversationHistory = messages
                .slice(-5) // Limit to the n last messages
                .map(msg => ({
                    role: msg.role,
                    content: msg.content
                }));

            // Send the input message to the API
            const response = await fetch('https://europe-north1-quantum-enigma-454921-f7.cloudfunctions.net/my_portfolio_chat_entry_point/assistant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': 'hich_chat_4c9c8316-6e23-4e57-b24e-a1792c74643b',
                },
                body: JSON.stringify({
                    input: content,
                    history: conversationHistory, // Include the last two messages in the history
                    date: currentDate,
                    time: currentTime,
                }),
                mode: 'cors',
            });

            if (!response.ok) {
                throw new Error(`API responded with status: ${response.status}`);
            }

            const data = await response.json();

            // Extract the assistant's response from the API response
            const assistantResponse = data.response || data.message || data.content || "Sorry, I couldn't generate a response.";

            // Add assistant response to the messages
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: assistantResponse,
                role: 'assistant',
                timestamp: new Date()
            };

            // Add the new user message to the history
            conversationHistory.push({
                role: 'user',
                content
            });

            // Add the new user message to the history
            conversationHistory.push({
                role: 'assistant',
                content: assistantMessage.content
            });

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Error sending message:', error);

            // Add error message
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: "Sorry, there was an error processing your request. Please try again later.",
                role: 'assistant',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const clearMessages = () => {
        setMessages([]);
        localStorage.removeItem('chatMessages');
    };

    return (
        <ChatContext.Provider value={{ messages, isLoading, sendMessage, clearMessages }}>
            {children}
        </ChatContext.Provider>
    );
};
