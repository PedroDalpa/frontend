import { GetStaticProps } from 'next';
import { useContext, useEffect } from 'react';
import LaunchButtons from '../../components/Production/LaunchButtons';
import VelocimeterChart from '../../components/VelocimeterChart';
import { LaunchContext } from '../../context/Production/LaunchContext';
import { api } from '../../services/api';

interface IEmployee {
  id: number;
  name: string;
}

interface ILaunchProps {
  employees: IEmployee[];
  production: any;
}

export default function Launch({ employees, production }: ILaunchProps) {
  const { setEmployees, setProduction } = useContext(LaunchContext);
  useEffect(() => {
    setEmployees(employees);
    setProduction(production);
  }, [employees]);
  return (
    <>
      <div>
        <LaunchButtons />
      </div>
      <div>
        <VelocimeterChart />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const THIRTY_SECONDS = 30;

  const { data } = await api.get('employees');

  const { employees }: ILaunchProps = data;

  const response = await api.get('production');

  const { production } = response.data;

  return {
    props: { employees, production },
    revalidate: THIRTY_SECONDS,
  };
};
