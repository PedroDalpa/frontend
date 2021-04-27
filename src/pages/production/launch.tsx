import { GetStaticProps } from 'next';
import { useContext, useEffect } from 'react';
import LaunchButtons from '../../components/Production/LaunchButtons';
import { LaunchContext } from '../../context/Production/LaunchContext';
import { api } from '../../services/api';

interface IEmployee {
  id: number;
  name: string;
}

interface IEmployeeRequest {
  employees: IEmployee[];
}

export default function Launch({ employees }: IEmployeeRequest) {
  const { setEmployees } = useContext(LaunchContext);
  useEffect(() => {
    setEmployees(employees);
  }, [employees]);
  return (
    <div>
      <LaunchButtons />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const TWENTY_FOUR_HOURS = 60 * 60 * 24;
  const { data } = await api.get('employees');

  const { employees }: IEmployeeRequest = data;

  return {
    props: { employees },
    revalidate: TWENTY_FOUR_HOURS,
  };
};
