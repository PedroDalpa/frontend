import { createContext, ReactNode, useState } from 'react';
import { DefectModal } from '../../components/Production/DefectModal';
import { LaunchModal } from '../../components/Production/LaunchModal';
import { ReversalModal } from '../../components/Production/ReversalModal';

interface LaunchContextProviderProps {
  children: ReactNode;
}

interface ILaunchContext {
  launchModalToggle: (saveEmployee: boolean) => void;
  setEmployees: (employees: IEmployee[]) => void;
  employees: IEmployee[];
  saveEmployeeIdAfterSave: boolean;
  launched: number;
  setLaunched: (param: number) => void;
  defectModalToggle: () => void;
  reversalModalToggle: () => void;
}

interface IEmployee {
  id: number;
  name: string;
}

export const LaunchContext = createContext({} as ILaunchContext);

export function LaunchContextProvider({
  children,
}: LaunchContextProviderProps) {
  const [isLaunchModalOpen, setIsLaunchModalOpen] = useState(false);
  const [isDefectModalOpen, setIsDefectModalOpen] = useState(false);
  const [isReversalModalOpen, setIsReversalModalOpen] = useState(false);
  const [employees, setEmployees] = useState([{} as IEmployee]);
  const [saveEmployeeIdAfterSave, setSaveEmployeeIdAfterSave] = useState(false);

  const [launched, setLaunched] = useState(0);

  function launchModalToggle(saveEmployee: boolean) {
    setIsLaunchModalOpen(!isLaunchModalOpen);
    setSaveEmployeeIdAfterSave(saveEmployee);
  }

  function defectModalToggle() {
    setIsDefectModalOpen(!isDefectModalOpen);
  }

  function reversalModalToggle() {
    setIsReversalModalOpen(!isReversalModalOpen);
  }

  return (
    <LaunchContext.Provider
      value={{
        launchModalToggle,
        setEmployees,
        employees,
        saveEmployeeIdAfterSave,
        launched,
        setLaunched,
        defectModalToggle,
        reversalModalToggle,
      }}
    >
      {children}
      {isLaunchModalOpen && <LaunchModal />}
      {isDefectModalOpen && <DefectModal />}
      {isReversalModalOpen && <ReversalModal />}
    </LaunchContext.Provider>
  );
}
