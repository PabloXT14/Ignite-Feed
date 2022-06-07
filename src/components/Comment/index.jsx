
import { ThumbsUp, Trash } from 'phosphor-react';
import styles from './styles.module.css'; 


export function Comment() {
    return (
        <div className={styles.comment}>
            <img src="https://github.com/pabloxt14.png" alt="" />

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Pablo Alan</strong>
                            <time title='07 de Junho às 17:36h' dateTime="2022-06-07 17:36:32">Cerca de 1h atrás</time>
                        </div>

                        <button title='Deletar comentário'>
                            <Trash size={20}/>
                        </button>

                    </header>

                    <p>Muito bom Devon, parábens!! 👌👌</p>
                </div>

                <footer>
                    <button>
                        <ThumbsUp />
                        Aplaudir <span>20</span>
                    </button>
                </footer>

            </div>
        </div>
    );
}