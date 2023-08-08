import React, {useState, useEffect} from 'react';
import PageBanner from '@/components/Common/PageBanner';
import { parseCookies } from 'nookies'
import axios from 'axios'

const EditProfile = () => {
    const { token } = parseCookies()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState('')
    const [about, setAbout] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    useEffect(() => {
        async function start(){
            try {
                setLoading(true)
                const url = `/api/v1/user/get-profile`
                const response = await axios.get(url, {
                    headers: {Authorization: token}
                })
                console.log(response.data)
                setData(response.data)
                setLoading(false)

                setName(response.data?.name)
                setAbout(response.data?.about)
                setPhoneNumber(response.data?.phone)
    
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
        start()
    }, [])

    async function submitHandle(){
        const tempObj = {
            name: name,
            about: about,
            phone: phoneNumber
        }
        try {
            console.log("tempObj",tempObj)
            setLoading(true)
            const url = `/api/v1/user/edit-profile`
            const response = await axios.post(url, tempObj, {
                headers: {Authorization: token}
            })
            console.log(response.data)
            setLoading(false)

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <PageBanner 
                pageTitle="Edit Profile" 
                homePageUrl="/" 
                homePageText="Home" 
                activePageText="Edit Profile" 
            />  

            <div className="ptb-100">
                <div className="container">
                    <div className="border-box">
                        <form onSubmit={submitHandle}>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)}/>
                            </div> 
                            <div className="form-group">
                                <label>About</label>
                                <input type="text" className="form-control" value={about} onChange={(e)=>setAbout(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input type="phone" className="form-control" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
                            </div>

                            <button type="submit" className="default-btn mt-10">
                                <i className='flaticon-right-chevron'></i> Update

                                <span></span>
                            </button> 
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProfile;