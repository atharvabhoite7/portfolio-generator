import Header from "../components/Header/Header";
import AboutMe from "../components/AboutMe/AboutMe";
import Skills from "../components/Skills/Skills";
import Projects from "../components/Projects/Projects";
import Experience from "../components/Experience/Experience";
import Achievements from "../components/Achievements/Achievements";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import SaveDiscard from "../components/SaveDiscard/SaveDiscard";
import { getSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Edit(props) {
    const router = useRouter();
    let userProfile = props.userData;
    const handleClickSave = async () => {
        await axios
            .post("http://localhost:3000/api/post-data", {
                userProfile: userProfile,
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        router.push(`http://localhost:3000/${userProfile._id.toString()}`);
    };
    const handleClickDiscard = () => {
        router.push(`http://localhost:3000/${userProfile._id.toString()}`);
    };
    return (
        <section>
            <SaveDiscard
                onClickSave={handleClickSave}
                onClickDiscard={handleClickDiscard}
            />
            <Header data={userProfile} isEdit={true} />
            <AboutMe data={userProfile} isEdit={true} />
            <Skills data={userProfile} isEdit={true} />
            <Projects data={userProfile} isEdit={true} />
            <Experience data={userProfile} isEdit={true} />
            <Achievements data={userProfile} isEdit={true} />
            <Contact data={userProfile} isEdit={true} />
            <Footer data={userProfile} isEdit={true} />
        </section>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    let userData = null;
    if (session) {
        await axios
            .get(
                `http://localhost:3000/api/user-email?email=${session.user.email}`
            )
            .then((res) => {
                userData = res.data;
            })
            .catch((err) => {
                console.log("err", err);
            });
    }
    return {
        props: {
            userData,
        },
    };
}
