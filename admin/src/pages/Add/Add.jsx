import React, { useState } from 'react'
import './Add.css'
import { assets, url } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {


    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "ข้าว"
    });

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!image) {
            toast.error('ยังไม่ได้เลือกภาพ');
            return null;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);
        const response = await axios.post(`${url}/api/food/add`, formData);
        if (response.data.success) {
            toast.success(response.data.message)
            setData({
                name: "",
                description: "",
                price: "",
                category: data.category
            })
            setImage(false);
        }
        else {
            toast.error(response.data.message)
        }
    }

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-img-upload flex-col'>
                    <p>อัปโหลดภาพ</p>
                    <input onChange={(e) => { setImage(e.target.files[0]); e.target.value = '' }} type="file" accept="image/*" id="image" hidden />
                    <label htmlFor="image">
                        <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" />
                    </label>
                </div>
                <div className='add-product-name flex-col'>
                    <p>ชื่ออาหาร</p>
                    <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='บะหมี่' required />
                </div>
                <div className='add-product-description flex-col'>
                    <p>คำอธิบายเพิ่มเติม</p>
                    <textarea name='description' onChange={onChangeHandler} value={data.description} type="text" rows={6} placeholder='เขียนเพิ่มเติม' required />
                </div>
                <div className='add-category-price'>
                    <div className='add-category flex-col'>
                        <p>ประเภท</p>
                        <select name='category' onChange={onChangeHandler} >
                            <option value="ข้าว">ข้าว</option>
                            <option value="เกี๊ยว">เกี๊ยว</option>
                            <option value="บะหมี่น้ำ">บะหมี่น้ำ</option>
                            <option value="บะหมี่ต้มยำน้ำใส">บะหมี่ต้มยำน้ำใส</option>
                            <option value="บะหมี่ต้มยำน้ำข้น">บะหมี่ต้มยำน้ำข้น</option>
                            <option value="บะหมี่แห้ง">บะหมี่แห้ง</option>
                            <option value="ท็อปปิ้ง">ท็อปปิ้ง</option>
                        </select>
                    </div>
                    <div className='add-price flex-col'>
                        <p>ราคา</p>
                        <input type="Number" name='price' onChange={onChangeHandler} value={data.price} placeholder='25' />
                    </div>
                </div>
                <button type='submit' className='add-btn' >เพิ่ม</button>
            </form>
        </div>
    )
}

export default Add
