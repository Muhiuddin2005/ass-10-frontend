import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import AddChallenge from "../pages/AddChallenge";
import ChallengeDetails from "../components/ChallengeDetails";
import UpdateChallenge from "../pages/UpdateChallenge";
import MyAddedChallenges from "../pages/MyAddedChallenges";
import MyParticipations from "../pages/MyParticipations";
import PrivateRoute from "../privateRoute/PrivateRoute";
import MyProfile from "../pages/MyProfile";
import ErrorPage from "../pages/ErrorPage";
import ChallengesPage from "../pages/ChallengesPage";
import ForgotPassword from "../pages/ForgotPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: () => fetch("https://ass-10-sigma.vercel.app/challenges"),
      },
      {
        path: "/challenges",
        element: <ChallengesPage />,
        loader: () => fetch("https://ass-10-sigma.vercel.app/challenges"),
      },
      {
        path: "/logIn",
        element: <LogIn />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/add-challenge",
        element: (
          <PrivateRoute>
            <AddChallenge />
          </PrivateRoute>
        ),
      },
      {
        path: "/challenge-details/:id",
        element: <ChallengeDetails />,
        loader: ({ params }) =>
          fetch(`https://ass-10-sigma.vercel.app/challenges/${params.id}`),
      },
      {
        path: "/update-challenge/:id",
        element: (
          <PrivateRoute>
            <UpdateChallenge />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://ass-10-sigma.vercel.app/challenges/${params.id}`),
      },
      {
        path: "/my-added-challenges",
        element: (
          <PrivateRoute>
            <MyAddedChallenges />
          </PrivateRoute>
        ),
      },
      {
        path: "/participants",
        element: (
          <PrivateRoute>
            <MyParticipations />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        element: (
          <ErrorPage/>
        ),
      },
    ],
  },
]);
