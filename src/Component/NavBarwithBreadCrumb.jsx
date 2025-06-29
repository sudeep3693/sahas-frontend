import Breadcrumbs from "./BreadCrumbs";
import NavBar from "./NavBar";

function NavBarwithBreadcrumb({onProductsClick, onContactClick}){

    return(

        <>
        <NavBar onProductsClick={onProductsClick} onContactClick={onContactClick} />
        <Breadcrumbs/>
        </>
    )

}
export default NavBarwithBreadcrumb;