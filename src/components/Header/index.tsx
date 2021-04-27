import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import styles from './styles.module.scss';

export function Header() {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR,
  });

  return (
    <>
      <head className={styles.headerContainer}>
        <img src="/logo.png" alt="teste" />
        <p>Mundo moveis</p>
        <span>{currentDate}</span>
      </head>
    </>
  );
}
