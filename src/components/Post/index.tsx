import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

import { Avatar } from '../Avatar';
import { Comment } from '../Comment';

import styles from './styles.module.css';

interface Author {
    avatarUrl: string;
    name: string;
    role: string;
}

interface Content {
    type: 'paragraph' | 'link';
    content: string;
}

export interface PostProps {
    id?: number;
    author: Author,
    content: Content[],
    publishedAt: Date,
}

export function Post({ author, content, publishedAt }: PostProps) {
    const [comments, setComments] = useState([
        'Post top demais 👍'
    ]);

    const [newCommentText, setNewCommentText] = useState('');

    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR
    });

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true
    });


    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault();

        setComments([...comments, newCommentText]);

        setNewCommentText('');
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('');// parar de dar msg de inválido
        setNewCommentText(event.target.value);
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        //setCustomValidity: função do Javascript que seta o texto de um input inválido
        event.target.setCustomValidity('Esse campo é obrigatório!');
    }

    function deleteComment(commentToDelete: string) {
        // IMUTABILIDADE -> as variáveis não sofrem mutação, nós criamos um novo valor (um novo espaço na memória)
        const commentsWithoutDeletedOne = comments.filter(comment => comment !== commentToDelete);

        setComments(commentsWithoutDeletedOne);
    }

    const isNewCommentEmpty = newCommentText.length === 0;

    return (
        <article className={styles.post}> 
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {content.map(line => {
                    if(line.type === 'paragraph') {
                        return <p key={line.content}>{line.content}</p>
                    } else if(line.type === 'link') {
                        return <p key={line.content}><a href='#'>{line.content}</a></p>
                    }
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea 
                    value={newCommentText}
                    onChange={handleNewCommentChange}
                    placeholder='Deixe um comentário'
                    onInvalid={handleNewCommentInvalid}
                    required
                />

                <footer>
                    <button type='submit' disabled={isNewCommentEmpty}>Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                    return <Comment 
                                key={comment} 
                                content={comment}
                                onDeleteComment={deleteComment}
                            />
                })}
            </div>
        </article>
    );
}