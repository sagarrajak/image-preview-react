  import React from "react";
import style from "./imagePreview.module.css";
import ImagePreview from "./ImagePreview";
import SideBar from "./SideBar";
function index() {
    const galleryImages2 = [
        {
          img: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
          img: "https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
          img: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
          img: "https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          backImg:
            "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
          img: "https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
          img: "https://images.pexels.com/photos/1712/sunglasses-apple-iphone-desk.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
          img: "https://images.unsplash.com/photo-1503249023995-51b0f3778ccf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aGQlMjBwaG90b3N8ZW58MHx8MHx8&w=1000&q=80",
        },
        {
          doc: '/sample.pdf'
        }
      ];


      let galleryImages = [
        {
            "id": 76180,
            "name": "DL",
            "img": "https://d2n0idf0n5xz1f.cloudfront.net/image/production/1675412981650",
            "doc_file_type": "img",
            "status": 2
        },
        {
            "id": 76181,
            "name": "NUMBER PLATE",
            "img": "https://d2n0idf0n5xz1f.cloudfront.net/image/production/1675413021982",
            "doc_file_type": "img",
            "status": 2
        },
        {
            "id": 76182,
            "name": "LOADING FLOOR",
            "img": "https://d2n0idf0n5xz1f.cloudfront.net/image/production/1675413027034",
            "doc_file_type": "img",
            "status": 2
        },
        {
            "id": 76183,
            "name": "CANCELLED CHECK",
            "img": "https://d2n0idf0n5xz1f.cloudfront.net/image/production/1675413082086",
            "doc_file_type": "img",
            "status": 2
        },
        {
            "id": 76184,
            "name": "RC",
            "img": "https://d2n0idf0n5xz1f.cloudfront.net/image/production/1675413033143",
            "doc_file_type": "img",
            "status": 2
        },
        {
            "id": 76185,
            "name": "AADHAR",
            "img": "https://d2n0idf0n5xz1f.cloudfront.net/image/production/1675413052351",
            "doc_file_type": "img",
            "status": 2
        },
        {
            "id": 76186,
            "name": "TDS",
            "img": "https://d2n0idf0n5xz1f.cloudfront.net/image/production/1675413057939",
            "doc_file_type": "img",
            "status": 2
        },
        {
            "id": 76209,
            "name": "handover document",
            "img": "https://d2n0idf0n5xz1f.cloudfront.net/image/production/1675415150415",
            "doc_file_type": "img",
            "status": 2
        },
        {
            "id": 76210,
            "name": "delivery challan",
            "img": "https://d2n0idf0n5xz1f.cloudfront.net/image/production/1675415155938",
            "doc_file_type": "img",
            "status": 2
        },
        {
            "id": 76211,
            "name": "customer cancelled cheq",
            "img": "https://d2n0idf0n5xz1f.cloudfront.net/image/production/1675415160631",
            "doc_file_type": "img",
            "status": 2
        },
        {
            "id": 76212,
            "name": "traders/ retailer invoice",
            "img": "https://d2n0idf0n5xz1f.cloudfront.net/image/production/1675416413434",
            "doc_file_type": "img",
            "status": 2
        },
        {
            "id": 76213,
            "name": "Retailer / Trader Cancelled Cheque",
            "img": "https://d2n0idf0n5xz1f.cloudfront.net/image/production/1675415186584",
            "doc_file_type": "img",
            "status": 2
        },
        {
            "id": 76214,
            "name": "weight slip",
            "img": "https://d2n0idf0n5xz1f.cloudfront.net/image/production/1675413974234",
            "doc_file_type": "img",
            "status": 2
        },
        {
            "id": 76215,
            "name": "transport bill",
            "img": "https://d2n0idf0n5xz1f.cloudfront.net/image/production/1675413979618",
            "doc_file_type": "img",
            "status": 2
        },
        {
            "id": 76216,
            "name": "9r",
            "img": "https://d2n0idf0n5xz1f.cloudfront.net/image/production/1675415790792",
            "doc_file_type": "img",
            "status": 2
        },
        {
            "id": 76217,
            "name": "first 9r gate pass",
            "img": "https://d2n0idf0n5xz1f.cloudfront.net/image/production/1675415786593",
            "doc_file_type": "img",
            "status": 2
        }
    ]
  return (
    <div className={style.container}>
      <ImagePreview galleryImages={galleryImages} />
    </div>
  );
}

export default index;
