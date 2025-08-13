import LayoutHeaderVendedor from './LayoutHeaderVendedor'
import LayoutNavVendedor from './LayoutNavVendedor'

const LayoutPainelVendedor = ({ children }) => {
  return (
    <div className="grid grid-nogutter flex h-screen m-0 overflow-hidden">
      <div className='col-1  p-0'>
        <LayoutNavVendedor />
      </div>
      <div className='col-11 p-0'>
        <div className="grid">
          <div className='col-12'>
            <LayoutHeaderVendedor />
          </div>
          <div className='col-12 px-5 '>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LayoutPainelVendedor