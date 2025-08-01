import {
  FaLock,
  FaTimesCircle,
  FaCheckCircle,
  FaClock
} from "react-icons/fa";

export const StatusMap = {
  indisponivel: <FaTimesCircle style={{ color: 'red' }} />,
  disponível: <FaLock style={{ color: 'green' }} />,
  alocado: <FaClock style={{ color: 'orange' }} />,
  devolvido: <FaCheckCircle style={{ color: 'blue' }} />,
  tramitando: <FaClock style={{ color: 'gray' }} />,
  assinado: <FaCheckCircle style={{ color: 'green' }} />,
  recorrido: <FaLock style={{ color: 'purple' }} />,
};