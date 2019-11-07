import React, { useState, useEffect, state } from "react";
import { Link } from 'react-router-dom';

const AdminDashboard = () => {

    return (
        <>
            <div className="admin-dashboard">
                <Link className="admin-dashboard__card" to="/admin/car">
                    <div className="admin-dashboard__txt admin-dashboard__txt--card-title">Samochody</div>
                    <div className="admin-dashboard__content admin-dashboard__content--card">
                        <div>Dodawanie producentów samochodów</div>
                        <div>Dodawanie modeli samochodów</div>
                        <div>Dodawanie generacji modeli</div>
                        <div>Lista producentów</div>
                    </div>

                </Link>

                <Link className="admin-dashboard__card" to="/admin/Equipment">
                    <div className="admin-dashboard__txt admin-dashboard__txt--card-title">Wyposażenie i Paliwo</div>
                    <div className="admin-dashboard__content admin-dashboard__content--card">
                        <div>Dodawanie nowego wyposażenia</div>
                        <div>Dodawanie nowego rodzaju paliwa</div>
                        <div>Lista wyposażenia i paliwa</div>
                    </div>
                </Link>
                <Link className="admin-dashboard__card" to="/admin/car">
                    <div className="admin-dashboard__txt admin-dashboard__txt--card-title">Oferty</div>
                    <div className="admin-dashboard__content admin-dashboard__content--card">
                        <div>Lista ofert </div>
                        <div>Zarządanie ofertami</div>
                    </div>
                </Link>
                <Link className="admin-dashboard__card" to="/admin/car">
                    <div className="admin-dashboard__txt admin-dashboard__txt--card-title">Użytkownicy</div>
                    <div className="admin-dashboard__content admin-dashboard__content--card">
                        <div>Lista użytkowników </div>
                        <div>Zarządanie użytkownikami</div>
                        <div>Nadawanie praw</div>
                        <div>Edycja kont użytkowników</div>
                    </div>
                </Link>

            </div>

        </>
    )

}

export default AdminDashboard;