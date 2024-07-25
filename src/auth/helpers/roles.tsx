import { CiCircleCheck, CiSquareRemove, CiUser } from 'react-icons/ci'

export const roles: { [key: string]: JSX.Element } = {
  admin: <CiCircleCheck size={30} />,
  user: <CiUser size={30} />,
  client: <CiSquareRemove size={30} />,
}
