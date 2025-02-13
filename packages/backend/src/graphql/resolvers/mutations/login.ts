import { User } from '../../../models/User'
import bcrypt from 'bcrypt'

interface LoginProps {
  email: string
  password: string
}

export default async (
  _parent: any,
  args: LoginProps,
  _context: any,
  _info: any
) => {
  const { email, password } = args

  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('User or password invalid')
  }

  const isAValidPassword = await bcrypt.compare(password, user.password)

  if (!isAValidPassword) {
    throw new Error('User or password invalid')
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    company: user.company,
  }
}
