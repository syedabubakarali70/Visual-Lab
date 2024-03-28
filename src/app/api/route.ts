import axios from 'axios' 

const api = axios.create({
    baseURL: 'https://emkc.org/api/v2/piston'
})

export const getLanguages = async () => {
    try {
        const response = await api.get('/runtimes')
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const executeCode = async (language: string, version: string, code: string) => {
    try {
        const response = await api.post('/execute', {
            language,
            version,
            files: [
                {
                    name: 'main',
                    content: code
                }
            ]
        })
        return response.data
    } catch (error) {
        console.error(error)
    }
}