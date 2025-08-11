import LayoutHeaderVendedor from './LayoutHeaderVendedor'
import LayoutNavVendedor from './LayoutNavVendedor'

const LayoutPainelVendedor = ({ children }) => {
  return (
    <div className="grid flex h-screen m-0">
      <div className='col-1 p-0'>
        <LayoutNavVendedor />
      </div>
      <div className='col-11 p-0'>
        <div className="grid">
          <div className='col-12'>
            <LayoutHeaderVendedor />
          </div>
          <div className='col-12'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LayoutPainelVendedor