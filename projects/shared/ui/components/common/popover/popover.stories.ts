// import { Meta, Story } from '@storybook/angular';
//
// import { storybookBaseModules } from '../../../../utils/storybook-base-modules';
//
// import { popoverPositions } from './popover-position';
// import { PopoverComponent } from './popover.component';
// import { PopoverModule } from './popover.module';
//
// const positionOptions: popoverPositions = [
//   'top',
//   'left',
//   'right',
//   'bottom',
//   'topLeft',
//   'topRight',
//   'bottomLeft',
//   'bottomRight',
//   'leftTop',
//   'leftBottom',
//   'rightTop',
//   'rightBottom',
// ];
//
// export default {
//   title: 'UiKit/Presentational',
//   component: PopoverComponent,
//   argTypes: {
//     trigger: {
//       name: 'Trigger type',
//       options: ['click', 'focus', 'hover', null],
//       defaultValue: 'hover',
//       control: { type: 'select' },
//     },
//     position: {
//       name: 'Position',
//       options: positionOptions,
//       control: { type: 'select' },
//     },
//     popoverClassName: {
//       name: 'Class name',
//       options: ['nz-popover-without-arrow', ''],
//       control: { type: 'select' },
//     },
//     isVisible: {
//       name: 'Is visible',
//       type: { name: 'boolean', required: false },
//       defaultValue: false,
//       control: { type: 'boolean' },
//     },
//     isPopoverArrowPointAtCenter: {
//       name: 'is Popover Arrow Point At Center',
//       type: { name: 'boolean', required: false },
//       defaultValue: false,
//       control: { type: 'boolean' },
//     },
//   },
// } as Meta;
//
// const Template: Story<PopoverComponent> = args => ({
//   moduleMetadata: {
//     imports: [PopoverModule, storybookBaseModules],
//   },
//   props: { ...args },
//   template: `
// <div style="width: 100%; height: 100%; display:flex; justify-content: center">
//     <tetu-popover
//     [template]="template"
//     [position]="position"
//     [trigger]="trigger">
//     <button style="margin: 0 auto; color: white">Click me</button>
// </tetu-popover>
// </div>
// <ng-template #template style="height: 100px; background: #73ddfe;">Popover content</ng-template>
//   `,
// });
//
// export const Popover = Template.bind({});
// Popover.args = {
//   position: 'bottomRight',
//   popoverClassName: '',
//   isVisible: false,
//   isPopoverArrowPointAtCenter: false,
//   trigger: 'hover',
// };
