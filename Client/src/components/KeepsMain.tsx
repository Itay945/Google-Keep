import { Link } from 'react-router-dom';
import SingleKeep from './SingleKeep';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { updateKeepPosition } from '../services/keepServices';

export type Keep = {
  _id: string;
  title: string;
  description: string;
  color: KeepColor;
  labels: string[];
  isDeleted: false;
  editedAt: Date;
  createdAt: Date;
  author: string;
  pin: boolean;
  position: number;
};

export type KeepColor =
  | 'Transparent'
  | 'Coral'
  | 'Peach'
  | 'Sand'
  | 'Mint'
  | 'Sage'
  | 'Fog'
  | 'Storm'
  | 'Dusk'
  | 'Blossom'
  | 'Clay'
  | 'Chalk';

interface KeepsMainProps {
  keeps: Keep[];
  error: string | null;
  onKeepUpdate: (keepId: string, updates: Partial<Keep>) => void;
}

function SortableItem({ keep, onKeepUpdate }) {
  return (
    <div>
      <SingleKeep keep={keep} onKeepUpdate={onKeepUpdate} />
    </div>
  );
}

export default function KeepsMain({ keeps, onKeepUpdate }: KeepsMainProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const filteredKeeps = keeps.filter((keep) => !keep.isDeleted);
  const pinnedKeeps = filteredKeeps.filter((keep) => keep.pin);
  const otherKeeps = filteredKeeps.filter((keep) => !keep.pin);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active?.id !== over?.id) {
      const draggedKeep = keeps.find((keep) => keep._id === active.id);
      const targetKeep = keeps.find((keep) => keep._id === over.id);

      if (draggedKeep && targetKeep) {
        if (draggedKeep.pin === targetKeep.pin) {
          try {
            await updateKeepPosition(
              draggedKeep._id,
              targetKeep.position,
              draggedKeep.pin
            );

            await updateKeepPosition(
              targetKeep._id,
              draggedKeep.position,
              targetKeep.pin
            );

            onKeepUpdate(draggedKeep._id, {
              position: targetKeep.position,
            });

            onKeepUpdate(targetKeep._id, {
              position: draggedKeep.position,
            });
          } catch (error) {
            console.error('Failed to swap keeps:', error);
          }
        } else {
          try {
            await updateKeepPosition(draggedKeep._id, 0, !draggedKeep.pin);

            onKeepUpdate(draggedKeep._id, {
              pin: !draggedKeep.pin,
              position: 0,
            });
          } catch (error) {
            console.error('Failed to update keep:', error);
          }
        }
      }
    }
  };
  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        // onDragEnd={handleDragEnd}
      >
        <div className="flex flex-wrap gap-4 p-4">
          {pinnedKeeps.length > 0 && (
            <div className="w-full">
              <h2>Pinned</h2>
              <div className="flex flex-wrap gap-4 p-4">
                <SortableContext
                  items={pinnedKeeps.map((keep) => keep._id)}
                  strategy={verticalListSortingStrategy}
                >
                  {pinnedKeeps.map((keep) => (
                    <SortableItem
                      key={keep._id}
                      keep={keep}
                      onKeepUpdate={onKeepUpdate}
                    />
                  ))}
                </SortableContext>
              </div>
            </div>
          )}

          {otherKeeps.length > 0 && (
            <div className="w-full">
              {pinnedKeeps.length > 0 && <h2>Others</h2>}
              <div className="flex flex-wrap gap-4 p-4">
                <SortableContext
                  items={otherKeeps.map((keep) => keep._id)}
                  strategy={verticalListSortingStrategy}
                >
                  {otherKeeps.map((keep) => (
                    <SortableItem
                      key={keep._id}
                      keep={keep}
                      onKeepUpdate={onKeepUpdate}
                    />
                  ))}
                </SortableContext>
              </div>
            </div>
          )}
        </div>
      </DndContext>
    </div>
  );
}
