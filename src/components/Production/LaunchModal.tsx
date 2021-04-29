import { Col, Form, Input, Row, Select } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { useContext, useState } from 'react';
import BarcodeReader from 'react-barcode-reader';
import { LaunchContext } from '../../context/Production/LaunchContext';
import { api } from '../../services/api';
import styles from '../../styles/Components/Production/LaunchModal.module.scss';
import { Notification } from '../Notification';
import { FiCheck } from 'react-icons/fi';

const { Option } = Select;

interface IProduct {
  id: string;
  productionPlanControlName: string;
  productName: string;
  barcode: string;
}
export function LaunchModal() {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const {
    launchModalToggle,
    employees,
    saveEmployeeIdAfterSave,
    launched,
    setLaunched,
  } = useContext(LaunchContext);
  const [employeeId, setEmployeeId] = useState(0);
  const [barcode, setBarcode] = useState('');

  const [products, setProducts] = useState([{} as IProduct]);

  async function launchBarcode(barcode: string) {
    var t0 = performance.now();
    try {
      const response = await api.put(`production/barcode/release/${barcode}`, {
        employee_id: employeeId,
      });
      setLaunched(launched + 1);

      if (products[0].id === undefined) {
        setProducts([response.data.product]);
      } else {
        const newProduct: IProduct[] = [...products, response.data.product];
        setProducts(newProduct);
      }

      if (saveEmployeeIdAfterSave) {
        setEmployeeId(0);
      }

      Notification({
        type: 'success',
        description: 'Código lançado com sucesso!',
        title: 'Sucesso!',
      });
    } catch (error) {
      if (error.response === undefined) {
        Notification({
          type: 'error',
          description: 'Ocorreu um erro inesperado!',
          title: 'ERRO!',
        });
      } else {
        Notification({
          type: 'error',
          description: error.response.data.message,
          title: 'Erro ao lançar!',
        });
      }
    }

    var t1 = performance.now();
    console.log(t1 - t0);
  }

  async function onRead(e) {
    if (employeeId === 0) {
      setEmployeeId(Number(e));
    } else {
      setConfirmLoading(true);
      await launchBarcode(e);
      setConfirmLoading(false);
    }
  }

  return (
    <Modal
      title="Lançamento de produção"
      visible={true}
      confirmLoading={confirmLoading}
      width={650}
      onCancel={() => launchModalToggle(false)}
      onOk={() => launchModalToggle(false)}
    >
      <Form name="dynamic_form_nest_item" autoComplete="off">
        <Row gutter={5}>
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 23 }}
              label="Funcionário:"
              labelAlign={'left'}
              name={'employee'}
            >
              <>
                <Select
                  id={'employeeSelect'}
                  showSearch
                  placeholder="Selecione"
                  size="large"
                  value={employeeId}
                  onChange={(e) => {
                    setEmployeeId(e);
                  }}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0 ||
                    option.props.value
                      .toString()
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  // eslint-disable-next-line max-len
                >
                  <Option key={0} value={0}>
                    não selecionado
                  </Option>
                  {employees.map((option) => {
                    return (
                      <>
                        <Option key={option.id} value={option.id}>
                          {option.name}
                        </Option>
                      </>
                    );
                  })}
                </Select>
              </>
            </Form.Item>
          </Col>

          <BarcodeReader onScan={onRead} onError={onRead} />
          <Col span={12}>
            <Form.Item
              name={'tag'}
              labelCol={{ span: 23 }}
              label="Digite o código (COM O TRAÇO):"
              labelAlign={'left'}
            >
              <Input
                placeholder="placeholder"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>
        {barcode != '' && (
          <Row>
            <Col span={24}>
              <button
                className={styles.launchButton}
                onClick={(e) => launchBarcode(barcode)}
              >
                <FiCheck />
              </button>
            </Col>
          </Row>
        )}
        <h1 className={styles.launchedNumber}>{launched}</h1>
        <Row>
          <section className={styles.table}>
            <h2>Produtos bipados</h2>
            <table>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>PCP</th>
                  <th>Nome</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  return (
                    <tr key={product.id}>
                      <td>{product.barcode}</td>
                      <td>{product.productionPlanControlName}</td>
                      <td>{product.productName}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        </Row>
      </Form>
    </Modal>
  );
}
