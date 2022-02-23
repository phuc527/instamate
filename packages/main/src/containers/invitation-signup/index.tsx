import { FC, useState } from "react";
import { Project } from "src/types/api/authentication";
import InvitationSignupForm from "../../components/invitation-signup-form";
import {
    StyledMedia,
    StyledMediaBody,
    StyledImage,
    StyledImgText,
    StyledSignin,
} from "./style";


const AuthContainer: FC = () => {
    const [dataProject, setDataProject] = useState<Project | null>()
    const getProject = (data: Project) => {
        setDataProject(data)
    }
    return (
        <StyledMedia>
            <StyledSignin>
                <InvitationSignupForm getProject={data => getProject(data)} />
            </StyledSignin>
            <StyledMediaBody>
                {dataProject?.photo ?
                    <StyledImage>
                        <img src={dataProject.photo} alt="Login" height='300px' />
                    </StyledImage>
                    : <></>
                }
                {dataProject?.website ?
                    < StyledImgText >
                        You have been invited by {dataProject?.name} to join {dataProject?.website}
                    </StyledImgText>
                    :
                    <StyledImgText>
                        You have been invited by {dataProject?.name}
                    </StyledImgText>
                }
                <p>Please register for account to get access to the dashboard</p>
            </StyledMediaBody>
        </StyledMedia >
    );
};

export default AuthContainer;
