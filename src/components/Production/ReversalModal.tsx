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
export function ReversalModal() {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const { reversalModalToggle } = useContext(LaunchContext);

  const [barcode, setBarcode] = useState('');

  const [products, setProducts] = useState([{} as IProduct]);

  async function launchBarcode(barcode: string) {
    var t0 = performance.now();
    try {
      const response = await api.put(`production/barcode/reversal/${barcode}`);

      if (products[0].id === undefined) {
        setProducts([response.data.product]);
      } else {
        const newProduct: IProduct[] = [...products, response.data.product];
        setProducts(newProduct);
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
  }

  async function onRead(e) {
    setConfirmLoading(true);
    await launchBarcode(e);
    setConfirmLoading(false);
  }

  return (
    <Modal
      title="Lançamento defeito"
      visible={true}
      confirmLoading={confirmLoading}
      width={650}
      onCancel={reversalModalToggle}
      onOk={reversalModalToggle}
    >
      <Form name="dynamic_form_nest_item" autoComplete="off">
        <Row>
          <BarcodeReader onScan={onRead} onError={onRead} />
          <Col>
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
