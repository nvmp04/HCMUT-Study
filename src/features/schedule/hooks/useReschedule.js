import { useMutation, useQueryClient } from "@tanstack/react-query";
import {Reschedule} from '../services/schedule.service'

export function useReschedule() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ appointment, timeSlot }) => Reschedule(appointment, timeSlot),
        
        onSuccess: (result, variables) => {
            if (result && result.success) {
                const { appointment } = variables;
                queryClient.invalidateQueries(['studentschedule']);
                if (appointment?.tutorId) {
                    queryClient.invalidateQueries(['tutorschedule', appointment.tutorId]);
                }
            }
        },
        onError: (error) => {
            console.error("Mutation error:", error);
        }
    });
}