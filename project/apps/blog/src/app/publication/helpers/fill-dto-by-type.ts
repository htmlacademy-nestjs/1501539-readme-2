import {PublicationType} from '@project/types';
import {fillDto} from '@project/helpers';
import { PublicationEntity } from '../publication.entity';
import { ImagePublicationRdo } from '../rdo/image-publication.rdo';
import { LinkPublicationRdo } from '../rdo/link-publication.rdo';
import { QuotePublicationRdo } from '../rdo/quote-publication.rdo';
import { TextPublicationRdo } from '../rdo/text-publication.rdo';
import { VideoPublicationRdo } from '../rdo/video-publication.rdo';


export const fillDtoByType = (entity: PublicationEntity) => {
  const entityPojo = entity.toPOJO();
  switch (entityPojo.type) {
    case PublicationType.IMAGE:
      return fillDto(ImagePublicationRdo, entityPojo);
    case PublicationType.LINK:
      return fillDto(LinkPublicationRdo, entityPojo);
    case PublicationType.QUOTE:
      return fillDto(QuotePublicationRdo, entityPojo);
    case PublicationType.TEXT:
      return fillDto(TextPublicationRdo, entityPojo);
    case PublicationType.VIDEO:
      return fillDto(VideoPublicationRdo, entityPojo);
  }
}
