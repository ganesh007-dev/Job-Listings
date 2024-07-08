import React, { useState } from 'react';
import {IoMdLogIn} from 'react-icons/io';
import  Button from 'react-bootstrap/Button';
import './Card.css';
import { FcOk } from "react-icons/fc";
import { IoLocationSharp } from "react-icons/io5";
import { FcFlashOn } from "react-icons/fc";
import { FcBusinessman , FcBusinesswoman} from "react-icons/fc";


export const Card=({name,role,location,jd,salary,experiance,logo})=>{
    //For Toggling the variable to view more || view less
    const [toggle,settoggle]=useState(false);
    //some objects in the array have experiance value as "null".
        if(experiance==null)
        {
            experiance=0;
        }
        //initial content of job description (before clicking view more link, this content appears for us)
        const getDescription = () => {
            // Splitting the job description by spaces and selecting the first 50 words
            const words = jd.split(' ').slice(0, 20).join(' ');
            return words + '...';
        };
        
        
    return(
        //contents in a card like role,company,pay...
        <div className='Card col-md-3 mb-1 m-5'>
            <h6 className='role'><b>Role</b> : {role}</h6>
            <h6 style={{color:'GrayText'}}><b>Estimated Salary</b> : ${salary}  <FcOk/></h6>
            <h6 className='name'><b><img src={logo} height={25} width={25}/> Company</b> : {name}</h6>
            <h6 class='lead'><IoLocationSharp /> <b>Location</b> : {location}</h6>
            <h6><u><b>Job Description</b></u></h6>
            {/* before toggling the link getDescription() will be displayed and after toggling entire content will be displayed */}
            {
                toggle ? JSON.stringify(jd) : getDescription()
            }
            {/* view more and view less links */}
            <a className='primary' onClick={()=>settoggle(!toggle)}>{!toggle?"View More":"View Less"}</a>

            <h6 className='experiance m-2'>Minimum Experiance : {experiance}+ years</h6>
            {/* Apply button */}
            <Button className=" col-12 " style={{color:'black',backgroundColor:'lightseagreen',border:'black'}}  ><FcFlashOn /><b>Easy Apply</b></Button>
            <div>
            <Button className='mt-2 col-12 'style={{backgroundColor:'blue'}} ><FcBusinessman /><FcBusinesswoman /><b>Unlock referral asks</b></Button>
            </div>
        </div>
    )
}