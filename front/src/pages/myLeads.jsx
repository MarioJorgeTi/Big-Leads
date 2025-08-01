import PageHeaders from "../components/templates/pageHeaders"

const MyLeads = () => {

  const breadcrumbItems = [
    {
      id: 1,
      label: 'Meus Leads'
    }
  ];

  return (
    <main className='flex flex-column h-screen w-full p-4'>
      <div className='flex flex-column lg:flex-row lg:justify-content-between lg:align-items-center'>
        <PageHeaders
          title={'Meus Leads'}
          navItems={breadcrumbItems}
          isFunnel
        />
      </div>
    </main>
  )
}

export default MyLeads