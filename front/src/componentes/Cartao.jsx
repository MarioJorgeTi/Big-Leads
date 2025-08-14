import { Card } from 'primereact/card';
import '../recursos/css/cartao.css'

const Cartao = ({ title, footer = null, template }) => {
  return (
    <Card className="md:min-w-25rem shadow-none text-primary border-round-2xl" footer={footer}>
      {title && title()}
      {template && template()}
    </Card>
  );
};

export default Cartao;
