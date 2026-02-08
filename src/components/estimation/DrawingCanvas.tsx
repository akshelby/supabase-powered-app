import { useRef, useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Pencil,
  Minus,
  Square,
  Circle,
  Type,
  Eraser,
  Undo2,
  Trash2,
  Download,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Tool = 'pencil' | 'line' | 'rectangle' | 'circle' | 'text' | 'eraser';

interface Point {
  x: number;
  y: number;
}

interface DrawingAction {
  type: Tool;
  color: string;
  strokeWidth: number;
  points?: Point[];
  startPoint?: Point;
  endPoint?: Point;
  text?: string;
}

const COLORS = [
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Green', value: '#22C55E' },
  { name: 'Yellow', value: '#EAB308' },
  { name: 'Purple', value: '#A855F7' },
];

const TOOLS: { tool: Tool; icon: typeof Pencil; label: string }[] = [
  { tool: 'pencil', icon: Pencil, label: 'Pencil' },
  { tool: 'line', icon: Minus, label: 'Line' },
  { tool: 'rectangle', icon: Square, label: 'Rectangle' },
  { tool: 'circle', icon: Circle, label: 'Circle' },
  { tool: 'text', icon: Type, label: 'Text' },
  { tool: 'eraser', icon: Eraser, label: 'Eraser' },
];

interface DrawingCanvasProps {
  onSave: (dataUrl: string) => void;
  initialData?: string;
}

export function DrawingCanvas({ onSave, initialData }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tool, setTool] = useState<Tool>('pencil');
  const [color, setColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<DrawingAction[]>([]);
  const [currentPoints, setCurrentPoints] = useState<Point[]>([]);
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [textInput, setTextInput] = useState<{ x: number; y: number; visible: boolean }>({
    x: 0,
    y: 0,
    visible: false,
  });
  const [inputText, setInputText] = useState('');

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const container = containerRef.current;
    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = 400;
    }

    // Fill with white background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Load initial data if provided
    if (initialData) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
      img.src = initialData;
    }
  }, [initialData]);

  // Redraw canvas when history changes
  useEffect(() => {
    redrawCanvas();
  }, [history]);

  const getCanvasPoint = useCallback((e: React.MouseEvent | React.TouchEvent): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }, []);

  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Clear and fill white
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Redraw all actions
    history.forEach((action) => {
      ctx.strokeStyle = action.type === 'eraser' ? '#FFFFFF' : action.color;
      ctx.lineWidth = action.type === 'eraser' ? action.strokeWidth * 5 : action.strokeWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      switch (action.type) {
        case 'pencil':
        case 'eraser':
          if (action.points && action.points.length > 1) {
            ctx.beginPath();
            ctx.moveTo(action.points[0].x, action.points[0].y);
            action.points.forEach((point) => {
              ctx.lineTo(point.x, point.y);
            });
            ctx.stroke();
          }
          break;

        case 'line':
          if (action.startPoint && action.endPoint) {
            ctx.beginPath();
            ctx.moveTo(action.startPoint.x, action.startPoint.y);
            ctx.lineTo(action.endPoint.x, action.endPoint.y);
            ctx.stroke();
          }
          break;

        case 'rectangle':
          if (action.startPoint && action.endPoint) {
            const width = action.endPoint.x - action.startPoint.x;
            const height = action.endPoint.y - action.startPoint.y;
            ctx.strokeRect(action.startPoint.x, action.startPoint.y, width, height);
          }
          break;

        case 'circle':
          if (action.startPoint && action.endPoint) {
            const radiusX = Math.abs(action.endPoint.x - action.startPoint.x);
            const radiusY = Math.abs(action.endPoint.y - action.startPoint.y);
            const radius = Math.sqrt(radiusX * radiusX + radiusY * radiusY);
            ctx.beginPath();
            ctx.arc(action.startPoint.x, action.startPoint.y, radius, 0, Math.PI * 2);
            ctx.stroke();
          }
          break;

        case 'text':
          if (action.startPoint && action.text) {
            ctx.font = `${action.strokeWidth * 5}px sans-serif`;
            ctx.fillStyle = action.color;
            ctx.fillText(action.text, action.startPoint.x, action.startPoint.y);
          }
          break;
      }
    });
  }, [history]);

  const handleStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      const point = getCanvasPoint(e);

      if (tool === 'text') {
        setTextInput({ x: point.x, y: point.y, visible: true });
        return;
      }

      setIsDrawing(true);
      setStartPoint(point);
      setCurrentPoints([point]);
    },
    [tool, getCanvasPoint]
  );

  const handleMove = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDrawing) return;
      e.preventDefault();

      const point = getCanvasPoint(e);
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;

      if (tool === 'pencil' || tool === 'eraser') {
        setCurrentPoints((prev) => [...prev, point]);

        // Draw in real-time
        ctx.strokeStyle = tool === 'eraser' ? '#FFFFFF' : color;
        ctx.lineWidth = tool === 'eraser' ? strokeWidth * 5 : strokeWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        const points = [...currentPoints, point];
        if (points.length > 1) {
          ctx.beginPath();
          ctx.moveTo(points[points.length - 2].x, points[points.length - 2].y);
          ctx.lineTo(point.x, point.y);
          ctx.stroke();
        }
      } else {
        // For shapes, redraw canvas and show preview
        redrawCanvas();
        ctx.strokeStyle = color;
        ctx.lineWidth = strokeWidth;
        ctx.lineCap = 'round';
        ctx.setLineDash([5, 5]);

        if (startPoint) {
          switch (tool) {
            case 'line':
              ctx.beginPath();
              ctx.moveTo(startPoint.x, startPoint.y);
              ctx.lineTo(point.x, point.y);
              ctx.stroke();
              break;

            case 'rectangle':
              ctx.strokeRect(
                startPoint.x,
                startPoint.y,
                point.x - startPoint.x,
                point.y - startPoint.y
              );
              break;

            case 'circle':
              const radiusX = Math.abs(point.x - startPoint.x);
              const radiusY = Math.abs(point.y - startPoint.y);
              const radius = Math.sqrt(radiusX * radiusX + radiusY * radiusY);
              ctx.beginPath();
              ctx.arc(startPoint.x, startPoint.y, radius, 0, Math.PI * 2);
              ctx.stroke();
              break;
          }
        }
        ctx.setLineDash([]);
      }
    },
    [isDrawing, tool, color, strokeWidth, currentPoints, startPoint, getCanvasPoint, redrawCanvas]
  );

  const handleEnd = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDrawing) return;

      const point = getCanvasPoint(e);

      if (tool === 'pencil' || tool === 'eraser') {
        if (currentPoints.length > 0) {
          setHistory((prev) => [
            ...prev,
            {
              type: tool,
              color,
              strokeWidth,
              points: [...currentPoints, point],
            },
          ]);
        }
      } else if (startPoint) {
        setHistory((prev) => [
          ...prev,
          {
            type: tool,
            color,
            strokeWidth,
            startPoint,
            endPoint: point,
          },
        ]);
      }

      setIsDrawing(false);
      setCurrentPoints([]);
      setStartPoint(null);

      // Save to parent
      const canvas = canvasRef.current;
      if (canvas) {
        onSave(canvas.toDataURL('image/png'));
      }
    },
    [isDrawing, tool, color, strokeWidth, currentPoints, startPoint, getCanvasPoint, onSave]
  );

  const handleTextSubmit = useCallback(() => {
    if (inputText.trim()) {
      setHistory((prev) => [
        ...prev,
        {
          type: 'text',
          color,
          strokeWidth,
          startPoint: { x: textInput.x, y: textInput.y },
          text: inputText,
        },
      ]);

      const canvas = canvasRef.current;
      if (canvas) {
        setTimeout(() => onSave(canvas.toDataURL('image/png')), 100);
      }
    }
    setTextInput({ ...textInput, visible: false });
    setInputText('');
  }, [inputText, color, strokeWidth, textInput, onSave]);

  const handleUndo = () => {
    setHistory((prev) => prev.slice(0, -1));
    const canvas = canvasRef.current;
    if (canvas) {
      setTimeout(() => onSave(canvas.toDataURL('image/png')), 100);
    }
  };

  const handleClear = () => {
    setHistory([]);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        onSave(canvas.toDataURL('image/png'));
      }
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 p-3 bg-muted/50 rounded-lg">
        {/* Tools */}
        <div className="flex gap-1">
          {TOOLS.map(({ tool: t, icon: Icon, label }) => (
            <Button
              key={t}
              type="button"
              variant={tool === t ? 'default' : 'ghost'}
              size="icon"
              className="h-9 w-9"
              onClick={() => setTool(t)}
              title={label}
            >
              <Icon className="h-4 w-4" />
            </Button>
          ))}
        </div>

        <div className="w-px h-8 bg-border" />

        {/* Colors */}
        <div className="flex gap-1">
          {COLORS.map((c) => (
            <button
              key={c.value}
              type="button"
              className={cn(
                'w-7 h-7 rounded-full border-2 transition-transform hover:scale-110',
                color === c.value ? 'border-primary ring-2 ring-primary/30' : 'border-border'
              )}
              style={{ backgroundColor: c.value }}
              onClick={() => setColor(c.value)}
              title={c.name}
            />
          ))}
        </div>

        <div className="w-px h-8 bg-border" />

        {/* Stroke Width */}
        <div className="flex items-center gap-2 min-w-[120px]">
          <span className="text-xs text-muted-foreground">Size:</span>
          <Slider
            value={[strokeWidth]}
            onValueChange={([v]) => setStrokeWidth(v)}
            min={1}
            max={10}
            step={1}
            className="flex-1"
          />
        </div>

        <div className="flex-1" />

        {/* Actions */}
        <div className="flex gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={handleUndo}
            disabled={history.length === 0}
            title="Undo"
          >
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={handleClear}
            title="Clear"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={handleDownload}
            title="Download"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Canvas */}
      <div ref={containerRef} className="relative border rounded-lg overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          className="w-full touch-none cursor-crosshair"
          style={{ height: 400 }}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
        />

        {/* Text Input Overlay */}
        {textInput.visible && (
          <input
            type="text"
            autoFocus
            className="absolute bg-transparent border-b-2 border-primary outline-none px-1"
            style={{
              left: textInput.x,
              top: textInput.y - 20,
              color: color,
              fontSize: strokeWidth * 5,
            }}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleTextSubmit();
              if (e.key === 'Escape') setTextInput({ ...textInput, visible: false });
            }}
            onBlur={handleTextSubmit}
          />
        )}
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Draw your project layout, dimensions, or any reference sketch
      </p>
    </div>
  );
}
