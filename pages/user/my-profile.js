import React, { useEffect, useState } from 'react';
import PageBanner from '@/components/Common/PageBanner';
import Link from 'next/link';
import { parseCookies } from 'nookies'
import axios from 'axios'

const MyProfile = () => {
    const { token } = parseCookies()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
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
    
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
        start()
    }, [])

    return (
        <>
            <PageBanner
                pageTitle="My Profile"
                homePageUrl="/"
                homePageText="Home"
                activePageText="My Profile"
            />

            <div className="ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="user-profile">
                                <img src="/images/success-people/success-people3.jpg" />
                                {/* <h3>{data?.name}</h3> */}
                                {/* <p>{data?.email}</p> */}
                            </div>
                        </div>

                        <div className="col-lg-8">
                            <div className="user-profile-table">
                                <div className="table-responsive">
                                    <table className="table table-bordered vertical-align-top">
                                        <tbody>
                                            <tr>
                                                <td>Name</td>
                                                <td>{data?.name}</td>
                                            </tr>
                                            <tr>
                                                <td>About</td>
                                                <td>{data?.about}</td>
                                            </tr>
                                            <tr>
                                                <td>Role</td>
                                                <td>{data?.role}</td>
                                            </tr>
                                            <tr>
                                                <td>Email</td>
                                                <td>{data?.email}</td>
                                            </tr>
                                            <tr>
                                                <td>Phone Number</td>
                                                <td>{data?.phone}</td>
                                            </tr>
                                            <tr>
                                                <td>Status</td>
                                                <td>{data?.active? 'Active' : 'Disabled'}</td>
                                            </tr>
                                            <tr>
                                                <td>Created Time</td>
                                                <td>{data?.createdAt}</td>
                                            </tr>
                                            <tr>
                                                <td>Last Updated Time</td>
                                                <td>{data?.updatedAt}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyProfile;