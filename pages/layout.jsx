import Nav from "../components/Nav";

const Layout = ({children}) => {
  
  return (
    <div className="md:w-full px-4 lg:px-24 py-5 bg-gray-300" id="root">
      <Nav></Nav>
      <div>{children}</div>
    </div>
  )
}

export default Layout