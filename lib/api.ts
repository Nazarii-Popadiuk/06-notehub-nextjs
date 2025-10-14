import axios from "axios"
import type { Note } from "../types/note";

const API_URL = 'https://notehub-public.goit.study/api/notes'

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

interface FetchNotesProps {
    notes: Note[];
    totalPages: number
}

export const fetchNotes = async (search: string, page: number = 1, perPage: number = 12):Promise <FetchNotesProps> => {

    const response = await axios.get<FetchNotesProps>(API_URL, {
        params: {
            search,
            page,
            perPage
        },
        headers: {
        Authorization: `Bearer ${token}`
    }
    },

    )
    return response.data
}

export const createNote = async (title: string, content: string, tag: string): Promise<Note> => {
    const response = await axios.post<Note>(API_URL, 
        { title, content, tag }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    )
    return response.data
}

export const deleteNote = async (id: string): Promise<Note> => {
    const response = await axios.delete<Note>(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const fetchNoteById = async (id: string) => {
    const res = await axios.get<Note>(`/notes/${id}`)
    return res.data
}