// import {Meta, Story} from '@storybook/angular';
// import {StarsRatingComponent} from './stars-rating.component';
// import {StarsRatingModule} from './stars-rating.module';
//
// export default {
//   title: 'UiKit/Components',
//   args: {
//     rating: 3.7
//   },
//   argTypes: {
//     rating: {
//       name: 'Rating',
//       type: {name: 'number', required: true},
//       defaultValue: 3.7,
//       description: 'Demo Rating',
//       control: {
//         type: 'number',
//         max: 5,
//         min: 0,
//         step: 1,
//       },
//     },
//   },
// } as Meta;
//
// const Template: Story<StarsRatingComponent> = (args) => ({
//   moduleMetadata: {
//     imports: [
//       StarsRatingModule,
//     ],
//   },
//   props: {...args},
//   template: '<ds-stars-rating [rating]="rating"></ds-stars-rating>',
// });
//
// export const StarRating = Template.bind({});
// StarRating.args = {
//   rating: 3.7,
// };
