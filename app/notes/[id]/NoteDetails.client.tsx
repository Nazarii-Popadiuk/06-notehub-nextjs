"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from 'next/navigation';
import { fetchNoteById } from "@/lib/api";
import styles from "./NoteDetails.module.css"

const NoteDetailsClient = () => {
  const params = useParams();
  const idParam = params?.id;

  const noteId = Number(idParam);

  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !note) return <p>Some went wrong..</p>;


  return (
    <div className={styles.container}>
	<div className={styles.item}>
	  <div className={styles.header}>
	    <h2>Note title</h2>
	  </div>
	  <p className={styles.content}>Note content</p>
	  <p className={styles.date}>Created date</p>
	</div>
</div>

  );
};

export default NoteDetailsClient;
