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
}

export default function Launch({ employees }: ILaunchProps) {
  const { setEmployees, setProduction } = useContext(LaunchContext);
  useEffect(() => {
    setEmployees(employees);
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
  const THIRTY_SECONDS = 60 * 60 * 4;

  const { data } = await api.get('employees');

  const { employees }: ILaunchProps = data;

  return {
    props: { employees },
    revalidate: THIRTY_SECONDS,
  };
};
