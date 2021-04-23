import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { toast } from 'react-toastify';
import MobileMainNav from './partials/mobile-nav';
import { Redirect } from 'react-router';
import axios from 'axios'

function MobileMenu(props) {

    const [categoriesData,setCategories] = useState([]);
    const [search, setSearch] = useState(null);
    const [redirect, setRedirect] = useState(null);


    useEffect( () => {

        axios.get(`${process.env.REACT_APP_API_URL}Products/create_category/`)
        .then(response=>{
            setCategories(response.data);
        })
        .catch(err=>{
            toast.error(err.message);
        });
    }, [] )

    const onChangeHandler = (evt) => {
       
        setSearch(evt.target.value);
    }


    const onkeyUpHandler = (evt) => {
        if(evt.key === "Enter"){
            searchHandler();
        }
    }

    const searchHandler = () => {
      
        if(search){
            setRedirect(<Redirect to={{pathname:'/shop', search: "?type=search&id=" + search}}/>);
        }
        
        setSearch('');
    }


    return (
        <>
        {redirect}
        <div className="mobile-menu-container">
            <div className="mobile-menu-wrapper">
                <span className="mobile-menu-close"><i className="icon-close"></i></span>
                    <div className="mobile-search">
                            <label htmlFor="mobile-search" className="sr-only">Search</label> 
                                <input type="search" className="form-control" value={search} id="mobile-search" placeholder="Search product ..." required 
                                        onChange={onChangeHandler} onKeyUp={onkeyUpHandler}/>
                            <button className="btn btn-primary" onClick={searchHandler}><i className="icon-search"></i></button>
                    </div>
                <Tabs defaultIndex={ 0 } selectedTabClassName="show">
                    <TabList className="nav nav-pills-mobile nav-border-anim" role="tablist">
                        <Tab className="nav-item">
                            <span className="nav-link">Menu</span>
                        </Tab>

                        <Tab className="nav-item">
                            <span className="nav-link">Categories</span>
                        </Tab>
                    </TabList>

                    <div className="tab-content">
                        <TabPanel>
                            <MobileMainNav />
                        </TabPanel>

                        <TabPanel>
                            <nav className="mobile-cats-nav">
                                <ul className="mobile-cats-menu">
                                     {categoriesData.map((item,index)=>{
                                         return(
                                            <li  key={ "category" + index } className="item-lead">
                                            <Link to={`${process.env.PUBLIC_URL}/shop?type=category&id=${item.id}`}>{item.category_name}</Link>
                                        </li>
                                         )
                                     })}
                                </ul>
                            </nav>
                        </TabPanel>
                    </div>
                </Tabs>

                <div className="social-icons">
                    <a href="https://www.facebook.com/MOBILE1HUT" className="social-icon social-facebook" title="Facebook" target="_blank"><i className="icon-facebook-f"></i></a>
				    <a href="https://www.instagram.com/mobilehutstore/" className="social-icon social-instagram" title="Instagram" target="_blank"><i className="icon-instagram"></i></a>
				    <a href="https://www.youtube.com/channel/UCBILAY_VCfb-VBLRMAHr_Qg/videos" className="social-icon social-youtube" title="Youtube" target="_blank"><i className="icon-youtube"></i></a>							
                </div>
            </div>
        </div>
        </>
    )
}

export default React.memo( MobileMenu ); 