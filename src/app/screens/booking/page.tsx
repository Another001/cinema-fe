'use client'

import SeatBooking from "./SeatBooking";

const movies ={title :'New tieu de'};
function onBack (){
}

export default function Page(){
  return(
    <SeatBooking movie = {movies} onBack={onBack}/>
  )
}