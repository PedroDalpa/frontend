import { GetStaticProps } from 'next';
import { useContext } from 'react';
import { LaunchContext } from '../../context/Production/LaunchContext';
import styles from '../../styles/Components/Production/ButtonsLaunch.module.scss';

import { AiOutlineBarcode, AiOutlineUndo, AiOutlineTool } from 'react-icons/ai';

export default function LaunchButtons() {
  const {
    launchModalToggle,
    defectModalToggle,
    reversalModalToggle,
  } = useContext(LaunchContext);
  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.launch}
        onClick={(e) => launchModalToggle(false)}
      >
        <AiOutlineBarcode />
      </button>
      <button
        type="button"
        className={styles.groupedLaunch}
        onClick={(e) => launchModalToggle(true)}
      >
        <AiOutlineBarcode />
      </button>
      <button
        type="button"
        className={styles.defect}
        onClick={defectModalToggle}
      >
        <AiOutlineTool />
      </button>
      <button
        type="button"
        className={styles.reversal}
        onClick={reversalModalToggle}
      >
        <AiOutlineUndo />
      </button>
    </div>
  );
}
