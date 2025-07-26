import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github2';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: 'Ov23liKOAwfyUxW5GE4r',
      clientSecret: '43ab319fe2bbb3cf1e6b67298c7668a4ba86b987',
      callbackURL: 'http://localhost:3000/callback',
      scope: ['public_profile'],
    });
  }
  validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log(accessToken, refreshToken, profile);
    return profile;
  }
}
