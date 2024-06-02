import { Router } from "express";
import { createFlight, getFlight, getFlightbyId, updateFlight, removeFlight, searchFlight, getSeat, getSeatbyId, createOrder, getOrders } from "../services/flightServices.js";

const flightRoutes = Router();

flightRoutes.post("/flight", async (req, res) => {
  console.log("request body", req.body);
  const formData = {
    departure: req.body.departure,
    arrival: req.body.arrival,
    date: req.body.date,
    departuretime: req.body.departuretime,
    duration: req.body.duration,
    arrivaltime: req.body.arrivaltime,
    price: req.body.price,
  };
  const flightId = await createFlight(formData);
  res.json({
    message: "flight creation success",
    flightId,
  });
});

flightRoutes.put("/flight/:id", async (req, res) => {
  console.log("request body", req.body);
  const formData = {
    departure: req.body.departure,
    arrival: req.body.arrival,
    date: req.body.date,
    departuretime: req.body.departuretime,
    duration: req.body.duration,
    arrivaltime: req.body.arrivaltime,
    price: req.body.price,
    id: req.params.id
  };
  const flightId = await updateFlight(formData);
  res.json({
    message: "flight update success",
    flightId,
  });
});


flightRoutes.get("/flight", async (req, res) => {
    const flight = await getFlight()
    res.send(flight)
})

flightRoutes.get("/flight/:id", async (req, res) => {
  const flight = await getFlightbyId(req.params.id)
  res.send(flight)
})

flightRoutes.delete("/flight/:id", async (req, res) => {
  const flight = await removeFlight(req.params.id)
  res.send(flight)
})  

flightRoutes.post("/flight-search", async (req, res) => {
    console.log("request body", req.body);
    const formData = {
      departure: req.body.departure,
      arrival: req.body.arrival,
      date: req.body.date,
    };
    const flight = await searchFlight(formData);
    res.json(flight);
  });  

flightRoutes.get("/seat", async (req, res) => {
    const seat = await getSeat()
    res.send(seat)
})

flightRoutes.get("/seat/:id", async (req, res) => {
  const seat = await getSeatbyId(req.params.id)
  res.send(seat)
})


flightRoutes.post("/booking", async (req, res) => {
  console.log("request body", req.body);
  const formData = {
    userid: req.body.userid,
    flightid: req.body.flightid,
    seatid: req.body.seatid,
    fullName: req.body.fullName,
    phone: req.body.phone,
    email: req.body.email,
  };
  const flightId = await createOrder(formData);
  res.json({
    message: "flight creation success",
    flightId,
  });
});

flightRoutes.get("/booking", async (req, res) => {
  const booking = await getOrders()
  res.send(booking)
})

export default flightRoutes;
