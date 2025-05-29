import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

type DialogKey = 'search' | 'optimize' | 'documents' | null;

type Props = {
  currentDialog: DialogKey;
  onClose: () => void;
};

export function UniversalDialogComponent({ currentDialog, onClose }: Props) {
  const dialogContentMap: Record<Exclude<DialogKey, null>, { title: string; description: string }> = {
    search: {
      title: "Поиск специалистов",
      description: "Мы подберем нужных людей и обеспечим их интеграцию в проект.",
    },
    optimize: {
      title: "Оптимизация затрат",
      description: "Снижение налоговой нагрузки и расходов на зарплаты — это реально.",
    },
    documents: {
      title: "Юридическое сопровождение",
      description: "Берем на себя бумажную волокиту и легализацию сотрудников.",
    }
  };

  return (
    <Dialog open={currentDialog !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        {currentDialog && (
          <DialogHeader>
            <DialogTitle>{dialogContentMap[currentDialog].title}</DialogTitle>
            <DialogDescription>{dialogContentMap[currentDialog].description}</DialogDescription>
          </DialogHeader>
        )}
      </DialogContent>
    </Dialog>
  );
}
