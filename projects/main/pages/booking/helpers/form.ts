import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IForm } from '@ui/forms/interfaces/form';

export interface IBookingForm {
  from: {
    city: string;
    address: string;
    dateTime: Date | null;
  };
  to: {
    city: string;
    address: string;
  };
  details: {
    passengers: number;
    needChildSeat: boolean;
    hasPet: boolean;
  };
  passenger: {
    fullName: string;
    phone: string;
    comment: string;
  };
}

export function createGeneralForm(
  fb: FormBuilder,
  existingForm?: FormGroup<IForm<IBookingForm>>,
  data?: Partial<IBookingForm>
): FormGroup<IForm<IBookingForm>> {
  const form = existingForm ?? fb.group<IForm<IBookingForm>>({
    from: fb.group<IForm<IBookingForm['from']>>({
      city: fb.control(data?.from?.city ?? '', { nonNullable: true }),
      address: fb.control(data?.from?.address ?? '', { nonNullable: true }),
      dateTime: fb.control(data?.from?.dateTime ?? null),
    }),
    to: fb.group<IForm<IBookingForm['to']>>({
      city: fb.control(data?.to?.city ?? '', { nonNullable: true }),
      address: fb.control(data?.to?.address ?? '', { nonNullable: true }),
    }),
    details: fb.group<IForm<IBookingForm['details']>>({
      passengers: fb.control(data?.details?.passengers ?? 1, { nonNullable: true }),
      needChildSeat: fb.control(data?.details?.needChildSeat ?? false, { nonNullable: true }),
      hasPet: fb.control(data?.details?.hasPet ?? false, { nonNullable: true }),
    }),
    passenger: fb.group<IForm<IBookingForm['passenger']>>({
      fullName: fb.control(data?.passenger?.fullName ?? '', { nonNullable: true }),
      phone: fb.control(data?.passenger?.phone ?? '', { nonNullable: true }),
      comment: fb.control(data?.passenger?.comment ?? ''),
    }),
  });

  if (data) form.patchValue(data);

  return form;
}
