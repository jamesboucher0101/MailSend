'use client'

import { useState } from 'react'

export default function Home() {
    const [formData, setFormData] = useState({
        user: '',
        pass: '',
        from: '',
        to: '',
        subject: '',
        text: ''
    })
    const [result, setResult] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const response = await fetch('/api/mailsender', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()
            setResult(JSON.stringify(data, null, 2))
        } catch (error) {
            setResult(`Error: ${error}`)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <main className="min-h-screen p-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Mail Sender API</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Email Username</label>
                            <input
                                type="text"
                                name="user"
                                value={formData.user}
                                onChange={handleChange}
                                placeholder="your-email@gmail.com"
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Email Password</label>
                            <input
                                type="password"
                                name="pass"
                                value={formData.pass}
                                onChange={handleChange}
                                placeholder="your-password"
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">From Email</label>
                        <input
                            type="email"
                            name="from"
                            value={formData.from}
                            onChange={handleChange}
                            placeholder="sender@example.com"
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">To Email</label>
                        <input
                            type="email"
                            name="to"
                            value={formData.to}
                            onChange={handleChange}
                            placeholder="recipient@example.com"
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Subject</label>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Email Subject"
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Message Text</label>
                        <textarea
                            name="text"
                            value={formData.text}
                            onChange={handleChange}
                            placeholder="Your email message here..."
                            rows={4}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Send Email
                    </button>
                </form>

                {result && (
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-2">API Response:</h2>
                        <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
                            {result}
                        </pre>
                    </div>
                )}
            </div>
        </main>
    )
} 